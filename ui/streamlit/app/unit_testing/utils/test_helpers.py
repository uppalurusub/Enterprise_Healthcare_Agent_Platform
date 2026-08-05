from app.utils.helpers import (
    format_execution_time,
    format_timestamp,
)


def test_execution_time_none():

    assert format_execution_time(None) == "-"


def test_execution_time_float():

    assert format_execution_time(2.567) == "2.57 sec"


def test_execution_time_invalid():

    assert format_execution_time("abc") == "abc"


def test_timestamp_none():

    assert format_timestamp(None) == "-"


def test_timestamp_string():

    ts = "2026-07-23T12:00:00"

    assert format_timestamp(ts) != ""