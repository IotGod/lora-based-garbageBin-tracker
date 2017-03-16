import serial
from time import sleep

class  LoraCommand:
	def __init__(self, port):
		self.serialPort = serial.Serial(port,57600)

	def loraInit(self):
		loraResponse = self.loraCommand("sys get ver\r\n")
		# print "Lora Response on loraInit: ", loraResponse
		loraResponse = loraResponse.split()
		if loraResponse[0] == 'RN2483':
			return loraResponse
		else:
			return False

	def radioInit(self):
		# Initialize to Radio Mode
		loraResponse = self.loraCommand("mac pause\r\n")
		return loraResponse

	def radioReceive(self):
		loraResponse = self.loraCommand("radio rx 0\r\n")
		receiveData = None
		print loraResponse
		loraResponse = loraResponse.strip()
		if loraResponse == 'ok':
			receiveData = self.serialPort.readline().decode().split()
			if receiveData[0] == 'radio_rx':
				return receiveData[1]
			elif receiveData[0] == 'radio_err':
				return "LoRa nodes are not available"
		elif loraResponse == 'busy':
			sleep(5)
		return receiveData

	def loraCommand(self,command):
		self.serialPort.write(command.encode())
		loraResponse = self.serialPort.readline().decode()
		return loraResponse