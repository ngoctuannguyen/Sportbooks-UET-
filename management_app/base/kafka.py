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