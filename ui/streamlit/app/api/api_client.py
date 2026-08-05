import requests

class APIClient:

    @staticmethod
    def get(url):
        response = requests.get(url)
        response.raise_for_status()
        return response.json()

    @staticmethod
    def post(url, payload):
        response = requests.post(url, json=payload)

        if response.status_code >= 400:
            print(response.text)          # <-- very important
            raise Exception(
                f"{response.status_code}\n{response.text}"
            )
        
        return response.json()