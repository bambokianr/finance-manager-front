function OpenCalendar() {
	var gapi = window.gapi;
	var CLIENT_ID = "700374173719-pgslvviuj42tsqv1e4vilhk4qbb3mgmv.apps.googleusercontent.com";
	var API_KEY = "AIzaSyBgQqem5SfPf-_poVdzqssnC2CQbBIN9Zk";
	var SCOPES = "https://www.googleapis.com/auth/calendar";
	var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
	
	gapi.load('client:auth2', () => {
		console.log('client loaded');

		gapi.client.init({
			apiKey: API_KEY,
			clientId: CLIENT_ID,
			discoveryDocs: DISCOVERY_DOCS,
			scope: SCOPES,
		});

		gapi.client.load('calendar', 'v3', () => console.log('calendar loaded'));

		gapi.auth2.getAuthInstance().signIn().then(() => {
			/*var event = {
				'summary': 'Despesa de ' + value,
				'description': description,
				'start': {
					'date': date,
					'timeZone': 'America/Sao_Paulo'
				},
				'end': {
					'date': date,
					'timeZone': 'America/Sao_Paulo'
				},
				'reminders': {
					'useDefault': false,
					'overrides': [
						{'method': 'email', 'minutes': 24 * 60},
						{'method': 'popup', 'minutes': 10}
					]
				}
			};

			var request = gapi.client.calendar.events.insert({
				'calendarId': 'primary',
				'resource': event,
			});

			request.execute(event => {
					
			});*/
			window.open('https://www.google.com/calendar/render');
		});

	});
}

export default OpenCalendar;