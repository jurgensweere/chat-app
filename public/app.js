(function() {
    var socket;
    var input = document.querySelector('form[name=chat] input');
    var messages = document.getElementById('messages');
    var userList = document.getElementById('users');
    var myName = '';

    document.forms["chat"].addEventListener("submit", function(e){
        e.preventDefault();
        var message = input.value;
        input.value = '';

        if (message.length > 0) {
            socket.emit('chat message', message);
            appendMessage({ user: myName, msg: message }, true);
        }
    });

    document.forms['join'].addEventListener("submit", function(e) {
        e.preventDefault();
        var nameInput = document.querySelector('form[name=join] input');
        var name = nameInput.value;
        nameInput.value = '';

        if (name.length > 0) {
            myName = name;
            document.getElementById('join').style.display = "none";
            document.forms["chat"].style.display = "flex";
            connect(name);
        }
    });

    var connect = function(name) {
        socket = io();
        socket.on('chat message', appendMessage);
        socket.on('users', updateUsers);
        socket.emit('join', name);
    };

    var appendMessage = function(msg, ownMsg) {
        var li = document.createElement('li');
        li.textContent = msg.user + ': ' + msg.msg;
        li.className = 'list-group-item' + (ownMsg ? ' self' : '');
        messages.prepend(li);
    };

    var updateUsers = function(users) {
        while (userList.firstChild) {
            userList.removeChild(userList.firstChild);
        }
        for (var i = 0; i < users.length; i++) {
            var li = document.createElement('li');
            li.textContent = users[i];
            li.className = 'list-group-item';
            userList.append(li);
        }
    };

})();