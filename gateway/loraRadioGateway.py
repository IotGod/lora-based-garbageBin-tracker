
'''*********************************************************************************
GATEWAY - GARBAGE BIN
*********************************************************************************'''
#Import the Modules Required
import argparse
from loraCommand import LoraCommand
from time import sleep
from pubnub import Pubnub

PUB_KEY = "pub-c-913ab39c-d613-44b3-8622-2e56b8f5ea6d"
SUB_KEY = "sub-c-8ad89b4e-a95e-11e5-a65d-02ee2ddab7fe"

'''****************************************************************************************
Function Name 		:	init
Description		:	Initalize the LoRa Gateway and Pubnub
Parameters 		:	None
****************************************************************************************'''
def init():
	global loraConnect, pubnub
	pubnub = Pubnub(publish_key=PUB_KEY,subscribe_key=SUB_KEY)
	parser = argparse.ArgumentParser(description="Lora Gateway Connect ..")
	parser.add_argument('-p', dest='loraSerialPort', required=True)
	args = parser.parse_args()

 	print "Lora gateway init started"

 	if args.loraSerialPort:
 		loraConnect = LoraCommand(args.loraSerialPort)
 		loraResponse = loraConnect.loraInit()
 		if loraResponse:
 			print "LoRa init success"
 			print "Module : ", loraResponse[0]
 			print "Version : ", loraResponse[1]
 	else:
 		print "enter a valid port number to start"

 	loraRadioStart()

'''****************************************************************************************
Function Name 		:	loraRadioStart
Description		:	Receive the data from lora nodes
Parameters 		:	None
****************************************************************************************'''
def loraRadioStart():
 	global loraConnect, pubnub
 	try:
		loraConnect.radioInit()
		while True:
			print "waiting to receive data"
			loraData = loraConnect.radioReceive()
			if loraData != None:
				message = {"requester":"DEVICE","level":loraData}
				pubnub.publish(channel="garbageApp-resp", message=message)
				print "Received Data:", loraData
 	except Exception as e:
 		raise e
 	except KeyboardInterrupt:
 		print "Exit"

#Program Starts from here
if __name__ == '__main__':
	init()

#End of the Script

