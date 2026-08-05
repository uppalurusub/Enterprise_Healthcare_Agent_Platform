"""
Unit tests for Loguru logger
"""

from pathlib import Path

from app.utils.logger import logger, get_logger


def test_logger_exists():

    assert logger is not None


def test_get_logger():

    assert get_logger() is logger


def test_logger_sink_count():

    #
    # Console + healthcare.log + error.log
    #

    assert len(logger._core.handlers) >= 3


def test_info_logging():

    logger.info("pytest info")


def test_warning_logging():

    logger.warning("pytest warning")


def test_error_logging():

    logger.error("pytest error")


def test_exception_logging():

    try:
        raise RuntimeError("Failure")

    except RuntimeError:
        logger.exception("Runtime failure")


def test_debug_logging():

    logger.debug("pytest debug")


def test_unicode_logging():

    logger.info("🤒 Patient ₹50000 ✓")


def test_large_log():

    logger.info("Large " * 2000)


def test_log_directory_exists():

    assert Path("logs").exists()


def test_healthcare_log_file():

    logger.info("creating file")

    assert Path("logs/healthcare.log").exists()


def test_error_log_file():

    logger.error("creating error file")

    assert Path("logs/error.log").exists()


def test_multiple_messages():

    for i in range(10):
        logger.info(f"Message {i}")


def test_logger_type():

    #
    # Loguru logger exposes bind()
    #

    assert hasattr(logger, "bind")


def test_logger_remove_exists():

    assert hasattr(logger, "remove")


def test_logger_add_exists():

    assert hasattr(logger, "add")