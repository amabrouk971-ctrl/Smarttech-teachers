import sys

def verify_words(text):
    return len(text.strip().split())

sample = "This is a sample test string to verify word counter."
print("Sample count:", verify_words(sample))
