# To generate 2of12inf.txt:
#   Go to https://wordlist.aspell.net/12dicts/.
#   Download the zipped folder and extract it.
#   Open the "American" folder and open "2of12inf.txt", select all, and copy-paste into file.
#   Delete all end-of-line symbols.
# To generate esdb60.txt:
#   Go to https://app.aspell.net/create.
#   Uncheck "Roman Numerals".
#   Click "Download as Word List".
#   Scroll down to the start of lowercase words, select to the end of the page, and copy-paste into file.
#   Delete all words that contain an apostrophe.
#   Delete the 26 single-letter words.
# To generate esdb50.txt:
#   Same except change "?max_size=60" to "?max_size=50" in the word list page's URL.
# To generate esdb40.txt:
#   Same except change "?max_size=60" to "?max_size=40" in the word list page's URL.
# To compare changes:
#   git diff HEAD src/routes/pangrams/<FILE_NAME>.txt | grep '^[+-][^+-]' > diff.txt

folder = 'src/routes/pangrams/'

def get(file_name):
    with open(f"{folder}/{file_name}") as file:
        return set([ word.strip() for word in file.readlines() ])

all_words = get('2of12inf.txt').intersection(get('esdb40.txt'))
all_words.remove('dost')
all_words.remove('doth')
all_words.remove('hast')
all_words.remove('hath')
all_words.remove('shalt')
all_words.add('pangram')
all_words.add('pangrams')

word_list = list(all_words)
word_list.sort()

with open(f"{folder}/word_list.txt", 'w') as file:
    file.writelines([ f"{word}\n" for word in word_list ])
