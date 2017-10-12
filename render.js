message_regex = /(\d+\/\d+\/\d+),\s+(\d+:\d+)\s+(PM|AM)\s+-\s+(.+):\s+(((.+)\n*)+)/
action_regex = /(\d+\/\d+\/\d+),\s+(\d+:\d+)\s+(PM|AM)\s+-\s+(.+)/

function process_text(text) {
    var outer_div = document.getElementById('chatbox');

    text = text.split(/\n/);document
    for(var i = 0; i < text.length; i++) {
        if (message_regex.test(text[i])) {
            var match = message_regex.exec(text[i]);
            var date = match[1];
            var time = match[2];
            var meridian = match[3];
            var sender = match[4];
            var message = match[5];

            var div = document.createElement('div');
            div.setAttribute('class', 'message');

            var sender_div = document.createElement('div');
            var sender_span = document.createElement('span');
            sender_span.innerHTML = sender;
            sender_span.setAttribute('class', 'sender');
            sender_div.appendChild(sender_span);
            var send_time = document.createElement('span');
            send_time.innerHTML = time + ' ' + meridian;
            send_time.setAttribute('class', 'time');
            sender_div.appendChild(send_time);

            var message_text_div = document.createElement('div');
            var msg_span = document.createElement('span');
            message_text_div.appendChild(msg_span);
            msg_span.innerHTML = message;

            div.appendChild(sender_div);
            div.appendChild(message_text_div);

            outer_div.appendChild(div);
        }
        else if (action_regex.test(text[i])){
            var match = action_regex.exec(text[i]);
            var date = match[1];
            var time = match[2];
            var meridian = match[3];
            var action = match[4];

            var div = document.createElement('div');
            var paragraph = document.createElement('p');
            paragraph.setAttribute('class', 'action-message');
            paragraph.innerHTML = action;
            div.appendChild(paragraph);

            div.setAttribute('class', 'action');

            outer_div.appendChild(div);
        }
        else {
            console.log("line doesn't match any regex: ", text[i]);
        }
    }
}
