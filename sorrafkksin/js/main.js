function go(type){
    location.href="detail.html?type="+type;
}

const params=new URLSearchParams(location.search);
const type=params.get("type");

let selectedFrame=null;

if(type){
    const title=document.getElementById("title");
    const file2=document.getElementById("file2");

    title.innerText = type==="single"
        ? "Ảnh đơn - 7.000đ"
        : "Ảnh đôi - 14.000đ";

    if(type==="double") file2.style.display="block";

    setup();
}

/* setup */
function setup(){
    const canvas=document.getElementById("canvas");
    const ctx=canvas.getContext("2d");

    const file1=document.getElementById("file1");
    const file2=document.getElementById("file2");

    let img1=new Image();
    let img2=new Image();

    file1.onchange=e=>{
        const r=new FileReader();
        r.onload=()=>{img1.src=r.result; draw();}
        r.readAsDataURL(e.target.files[0]);
    }

    file2.onchange=e=>{
        const r=new FileReader();
        r.onload=()=>{img2.src=r.result; draw();}
        r.readAsDataURL(e.target.files[0]);
    }

    /* render frame list */
    const frameBox=document.getElementById("frames");

    FRAME_LIST.forEach(src=>{
        const img=document.createElement("img");
        img.src=src;
        img.onclick=()=>{
            selectedFrame=src;
            draw();
        };
        frameBox.appendChild(img);
    });

    function draw(){
        ctx.clearRect(0,0,500,500);

        if(type==="single"){
            ctx.drawImage(img1,0,0,500,500);
        }

        if(type==="double"){
            ctx.drawImage(img1,0,0,250,500);
            ctx.drawImage(img2,250,0,250,500);
        }

        if(selectedFrame){
            const frame=new Image();
            frame.src=selectedFrame;

            frame.onload=()=>{
                ctx.drawImage(frame,0,0,500,500);

                // watermark
                ctx.fillStyle="rgba(255,255,255,0.3)";
                ctx.font="20px Arial";
                ctx.fillText("sorrafk",10,490);
            }
        }
    }

    window.pay=function(){
        alert("Thanh toán thành công");

        const btn=document.getElementById("download");
        btn.style.display="inline-block";

        btn.onclick=()=>{
            const link=document.createElement("a");
            link.download="sorrafk.png";
            link.href=canvas.toDataURL();
            link.click();
        }
    }
}
