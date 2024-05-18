# from kafka import KafkaProducer
# from rest_framework.response import Response
from json import dumps
import json
import pickle
import time
import confluent_kafka
# from confluent_kafka import Producer
import uuid
# from confluent_kafka import Producer
import socket
from confluent_kafka import Consumer, KafkaError
import json
from concurrent.futures import ThreadPoolExecutor
import logging
# from .models import ....
logger = logging.getLogger(__name__)
executor = ThreadPoolExecutor(max_workers=3)

conf = {'bootstrap.servers': 'localhost:9092',
        'client.id': socket.gethostname(),
        'group.id': 'f',
}

topic = 'tutorialspedia'

producer = confluent_kafka.Producer(conf)
consumer = confluent_kafka.Consumer(conf)
# print(consumer)

# topic_name = 'tutorialspedia'
# config = {
#     'bootstrap.servers': 'localhost:9092', 
#     # 'value_serialize=lambda x: dumps(x).encode('utf-8')
# }
# config= {
#             'bootstrap.servers':  '**********',
#             'security.protocol':  '**********',
#             'ssl.ca.location': '**********',
#             'client.id': socket.gethostname(),
#             'enable.idempotence': True,
#             'acks': 'all',
#             'retries': 10,
#             'compression.type': 'gzip',
#             'max.in.flight.requests.per.connection': 5,
#             'compression.codec': 'gzip'
#             }

# producer = kafka.KafkaProducer(bootstrap_servers=[config['bootstrap.servers']], value_serialize=lambda x: dumps(x).encode('utf-8'))

for e in range(5):
    data = {
        'number': e,
    }
    # print(data)
    producer.produce('tutorialspedia', value=str(data).encode('utf-8'))
    time.sleep(5)

try:
    while True:
        msg = consumer.poll(1.0)

        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaError._PARTITION_EOF:
                continue
            else:
                print(f'Error while consuming: {msg.error()}')
        else:
            # Parse the received message
            value = msg.value().decode('utf-8')
            print(value)

except KeyboardInterrupt:
    pass
finally:
    # Close the consumer gracefully
    consumer.close()

def delete_data(model, query):
    try:
        model.objects(__raw__=query).delete()
    except Exception as e:
        logger.error('Error delete data:', e)
        # print('Error delete data:', e)
    
def delete_all_posts(user_id):
    try:
        posts = Posts.objects(__raw__={'user.id': user_id})
        for post in posts:
            # print('Delete post:', post.id)
            
            medias = MediaOfPosts.objects(__raw__={'post_id': post.id})
            for media in medias:
                try:
                    logger.info('Delete media:', media.id)
                    media.delete_media()
                except Exception as e:
                    logger.error('Error delete media:', e)
                    print('Error delete media:', e)
        
        for post in posts:
            try:
                logger.info('Delete post:', post.id)
                post.delete()
            except Exception as e:
                logger.error('Error delete post:', e)
                print('Error delete post:', e)

    except Exception as e:
        logger.error('Error delete all posts:', e)
        print('Error delete all posts:', e)
        

def process_message_user(msg):
    
    if msg.value() is None:
        print('No message')
        return
    logger.info('Begin process message User')
    try:
        msg_value = msg.value().decode('utf-8')

        # Parse the message as JSON
        msg_json = json.loads(msg_value)

        # Get the operation type
        op = msg_json['payload']['op']

        # Get the before data
        before_data = msg_json['payload']['before']
        
        # Perform the appropriate action in MongoDB based on the operation type
        if op == 'd':
            
            print("process_message_delete_user", msg_json)
            logger.info("process_message_delete_user", msg_json)
            
            # Get the user ID
            user_id = before_data['id']
            
            # executor.submit()

        print('Processed message User done!!!')
        logger.info('Processed message User done!!!')
    except KeyboardInterrupt:
        pass
    except Exception as e:
        logger.error('Error processing message User:', e)
        # print('Error processing message User:', e)
        
    
def consume_messages_user():
    logger.info("Consuming messages user")
    print("Consuming messages user")
    # Create a Kafka consumer
    c = Consumer({
        'bootstrap.servers': 'localhost:9092',
        'group.id': 'my_group',
        'auto.offset.reset': 'earliest'
    })

    # Subscribe to the Kafka topic
    c.subscribe(['social_network.public.users_user'])
    
    try:
        while True:
            # Poll for messages from Kafka
            msg = c.poll(1.0)
            if msg is None:
                continue
            elif msg.error():
                # print("Consumer error: {}".format(msg.error()))
                logger.error("Consumer error: {}".format(msg.error()))
                continue
            else:
                # Process the Kafka message
                process_message_user(msg)
    except KeyboardInterrupt:
        pass
    finally:
        c.close()
        executor.shutdown(wait=True)