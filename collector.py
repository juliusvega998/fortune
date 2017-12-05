import requests
from bs4 import BeautifulSoup

json = open("messages.json", "w")
txt = open("messages.txt", "w")

json.write("{\n")
json.write("\t\"data\": [\n")

for index in range(0, 839, 50):
	response = requests.get('http://www.fortunecookiemessage.com/archive.php?start=' + str(index))
	soup = BeautifulSoup(response.text, "html.parser")

	for s in soup.findAll('td', colspan="3"):
		json.write("\t\t\"" + s.a.next.replace("\"", "\\\"").replace("“", "\\\"") + "\",\n")
		txt.write(s.a.next.replace("\"", "\\\"").replace("“", "\\\"") + "\n")

json.write("\t]\n")
json.write("}\n")
json.close()
txt.close()
print("done!")