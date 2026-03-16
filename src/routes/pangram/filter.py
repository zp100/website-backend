def remove_annotations(word: str) -> str:
    return word.strip('$+^&!%')

def wordlen(word: str) -> int:
    return len(word.strip())

with open('2of12inf.txt', 'r') as file:
    words_us = file.readlines()
    words_us = [ remove_annotations(word) for word in words_us ]

with open('3of6game.txt', 'r') as file:
    words_int = file.readlines()
    words_int = [ remove_annotations(word) for word in words_int ]

words_both = list(set(words_us).intersection(set(words_int)))
words_both = [ word for word in words_both if wordlen(word) >= 4 ]
words_both.sort()

with open('word_list.txt', 'w') as file:
    file.writelines(words_both)
