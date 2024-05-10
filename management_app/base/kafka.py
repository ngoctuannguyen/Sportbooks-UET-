# from kafka import KafkaConsumer, KafkaProducer
# import json
# import uuid
# import sys

# # Replace these values with your actual configuration
# consumer = KafkaConsumer(
#     'my-topic',
#     bootstrap_servers=['localhost:9092'],
#     auto_offset_reset='earliest',
#     group_id='my-consumer-group'
# )

# for message in consumer:
#     # Process message data
#     print(message.value.decode('utf-8'))

# consumer.close()  # Close the consumer connection
# # print('f')