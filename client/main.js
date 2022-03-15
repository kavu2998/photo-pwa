const camera = new Camera(document.getElementById('player'));

const __init = () => {
    const messages = new Message();

    window.addEventListener('messages_error',() => {
        toastr.error('Cannot retrieve messages.<br>Will keep trying','Network connection Error');
    })
    
    window.addEventListener('messages_ready',()=>{
        $('#loader').remove();
        if(messages.all.length == 0)
            toastr.info('Add the first message','No messages');

        $('#messages').empty();
        messages.all.reverse().forEach(renderMessage);
    })

    window.addEventListener('new_message', (e)=>{
        renderMessage(e.detail);
    })
    console.log("Success")
    $('#viewfinder').on("show.bs.modal", () => {
        camera.switch_on();
    })
    
    $('#viewfinder').on("hidden.bs.modal", () => {
        camera.switch_off();
    })

    $('#shutter').on("click", () => {
       let photo = camera.take_photo();
       $('#camera').css('background-image',`url($(photo))`).addClass('withphoto');
    })

    $('#send').on("click", () => {
        let caption = $('#caption').val();
        
        if(!camera.photo || !caption){
            toastr.warning('Photo or title missing')
            return;
        }

        let message = messages.add(camera.photo,caption)

        renderMessage(message);

        $('#caption').val('');
        $('#camera').css('background-image','').removeClass('withphoto');
        camera.photo=null;


    })
}

const renderMessage = (message) => {
    let msgHTML = `
        <div style="display:none" class="row message bg-light mb-2 rounded shadow">
            <div class="col-2 p-1">
                <img src="${message.photo}" class="photo w-100 rounded">
            </div>
            <div class="col-10 p-1">${message.caption}</div>
        </div>
        `;

        $(msgHTML).prependTo('#messages').show(500).find('img').on("click",showPhoto);
}

const showPhoto = (e) => {
    let photoSrc = $(e.currentTarget).attr('src');
    $('#photoframe img').attr('src', photoSrc);
    $('#photoframe').modal('show');
}