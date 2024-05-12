from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return None
        # Di chuyển key đến cuối OrderedDict 
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            # Nếu key đã tồn tại, di chuyển nó đến cuối OrderedDict
            self.cache.move_to_end(key)
        else:
            # Nếu cache đã đầy, loại bỏ phần tử LRU (ở đầu OrderedDict)
            if len(self.cache) >= self.capacity:
                self.cache.popitem(last=False)
        # Thêm hoặc cập nhật giá trị của key
        self.cache[key] = value
