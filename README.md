# Before Sunrise
Volatile Chat Service Based on Location

## Members
1.	KyoungWan Chae(2010-12582): coruddhks@gmail.com
2.	Donguk Seo(2011-11410): uk6342@gmail.com
3.	Kyunghwan Lee(2012-10263): hwan517h1@gmail.com

## Description
Recently, many SNS services such as KakaoTalk, Facebook, Instagram have been developed rapidly. Online-only services are actually saturated. However, there is still no obvious service based on physical space, i.e. location. So we propose a practical but fun service that meets the demand to communicate extensively with people in the same space at a specific time. Our location-based volatile chat service will play a role of bringing new conversation and meeting as well as enjoying the present in that it has volatility and time limit is, as it starts afresh in the morning after the sun rises.

## Features
Our suggestion is location-based volatile chat service. To restrict users to people who are currently in the same space, we have the following conditions.
1.	Only people who are gathered in a specific place can have the authority to participate in the chat service.
2.	The chat service will refresh every hour.
3.	Participants will use their photos with their profiles.
4.	Some of the members in the entire chat room can create separated small chat rooms.

## Examples
These chat services could be used in the following cases.
1.	When people who participate in the class ask questions or share ideas
2.	When communicating with new people in pubs, clubs, etc.
3.	When real-time announcement, advertisement, promotion is performed at the event

## Functions
1.	We want to use the QR code to implement location-based properties. Users can participate in chats via the QR code provided only at that location, which can limit external access. In addition, the QR code maximizes internal access in that the connection procedure is much simpler than the GPS receiver or NFC function.
2.	QR codes are updated at regular intervals, which means that new users can only chat through updated QR codes. After a certain period of time, the existing chat room, related to a class or an event, will disappear entirely.

## Demo
We will present a QR code for accessing location-based volatile chat services in the final announcement. The QR code will be updated every minute by using iPad in a certain place, and the access through previous QR code will be restricted each time. After a certain amount of time, the chat room will disappear. In addition, some users will have the experience of creating their own chat rooms, such as generating their own QR code.

## Test
The location-based volatile service consists of two parts: a variable QR code that restricts each place, and a chat service, where some of the members can create separate small chat rooms. 10 people will take part in two chat rooms, each with a time difference, and some of them will create a separate small chat room. This will be useful for ensuring that our service works as intended.

