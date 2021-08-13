$(function () {

    const sleep = async (ms) => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res();
            }, ms)
        });
    }

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();

    $(".msger-input").keypress(function (event) {
        if (event.keyCode === 13) {
            $(".msger-send-btn").click();
        }
    });

    $(".msger-send-btn").click(function () {
        var message = $('.msger-input').val();
        var language = $('#inlineFormCustomSelect').val();
        if (message == "") {
            alert("BOT: Please input message!");
        }
        else {
            $('.msger-chat').append(`
            <div class="msg right-msg">
                <div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/145/145867.svg)"></div>

                <div class="msg-bubble">
                    <div class="msg-info">
                        <div class="msg-info-name">User</div>
                        <div class="msg-info-time">${time}</div>
                    </div>

                    <div class="msg-text">
                        ${message}
                    </div>
                </div>
            </div>
            `);

            scrollToBotton();

            $('.msger-input').val('');

            const url = `https://api.simsimi.net/v1/?text=${message}&lang=${language}&key=API-TEST-WEB&=`;

            // fetch(url, {
            //     method: "GET",
            //     mode: "cors"
            // })  
            // .then((respone) => respone.json())
            // .then((data) => { console.log(data) });

            $.get(url, function (data) {
                //console.log(data);

                $('.msger-chat').append(`
                <div class="msg left-msg">
                    <div
                    class="msg-img"
                    style="background-image: url(https://image.flaticon.com/icons/svg/327/327779.svg)"
                    ></div>
            
                    <div class="msg-bubble">
                    <div class="msg-info">
                        <div class="msg-info-name">BOT</div>
                        <div class="msg-info-time">${time}</div>
                    </div>
            
                    <div class="msg-text">
                        ${data.success}
                    </div>
                    </div>
                </div>
                `);

                scrollToBotton();
            });
        }
    });

});

function scrollToBotton() {
    $('.msger-chat').animate({
        scrollTop: $(
            '.msger-chat').get(0).scrollHeight
    }, 2000);
}
