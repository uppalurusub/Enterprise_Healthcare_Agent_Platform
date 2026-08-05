from api.api_client import APIClient
from utils.constants import BASE_URL


def health():
    return APIClient.get(f"{BASE_URL}/health")


def platform_info():
    return APIClient.get(f"{BASE_URL}/info")


def available_agents():
    return APIClient.get(f"{BASE_URL}/agents")


def execute(request: dict):
    return APIClient.post(
        f"{BASE_URL}/enterprise-healthcare-platform",
        request
    )