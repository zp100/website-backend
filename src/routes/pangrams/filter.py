folder = 'src/routes/pangrams/'

def get(file_name):
    with open(f"{folder}/{file_name}") as file:
        return set([ word.strip() for word in file.readlines() ])

all_words = get('2of12inf.txt').intersection(get('scowl40.txt'))
all_words.add('pangram')
all_words.add('pangrams')

word_list = list(all_words)
word_list.sort()

with open(f"{folder}/word_list.txt", 'w') as file:
    file.writelines([ f"{word}\n" for word in word_list ])
