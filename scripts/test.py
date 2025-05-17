import requests
from bs4 import BeautifulSoup
import re
import json

def fetch_chords_and_lyrics(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the <pre> tag with id="chords_and_lyrics"
    song_container = soup.find('pre', id='chords_and_lyrics')
    if not song_container:
        print("Could not find chords_and_lyrics container")
        return []

    lines = song_container.get_text().splitlines()

    parsed_lines = []
    for line in lines:
        # Split line by chord brackets, keep chords as separate tokens
        parts = re.split(r'(\[[^\]]+\])', line)

        line_chords = []
        line_lyrics = []

        for part in parts:
            if part.startswith('[') and part.endswith(']'):
                # Extract chord without brackets
                chord = part[1:-1]
                line_chords.append(chord)
                line_lyrics.append("")  # no lyrics for chord-only part
            else:
                # If there is text (lyrics) append lyrics and None for chord
                if part.strip():
                    line_lyrics.append(part)
                    line_chords.append(None)
                else:
                    # Skip empty strings
                    pass
        
        # Make sure chords and lyrics arrays are aligned in length
        max_len = max(len(line_chords), len(line_lyrics))
        line_pairs = []
        for i in range(max_len):
            chord = line_chords[i] if i < len(line_chords) else None
            lyric = line_lyrics[i] if i < len(line_lyrics) else ""
            line_pairs.append({"chord": chord, "lyric": lyric})

        parsed_lines.append(line_pairs)
    
    return parsed_lines


if __name__ == "__main__":
    url = "https://www.chordie.com/chord.pere/www.guitaretab.com/b/beatles/1169.html"
    data = fetch_chords_and_lyrics(url)
    print(json.dumps(data, indent=2, ensure_ascii=False))
