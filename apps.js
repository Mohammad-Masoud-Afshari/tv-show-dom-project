var backup;
const allResult = async () => 
{
    const response = await axios.get("https://api.tvmaze.com/shows/82/episodes");
    backup= await response.data.map((x) => x);;
    return response.data;
};
allResult()
.then((data) => 
{console.log(data);
    cardMaker(data);selectOptionMaker(data);})
.catch((err) => 
{console.log("Erorr", err);});
const span =document.querySelector(".span");
const serach = document.querySelector(".search");
const board = document.querySelector(".board");
const select = document.querySelector(".select");

const selectOptionMaker = (list) => 
{
    const option = document.createElement("option");
    option.append(`All Episods`);
    select.append(option);
    list.forEach((ep) => 
    {
        if(ep.number<10)
        {
            const option = document.createElement("option");
            option.value = ep.name;
            option.append("S0"+ep.season+"-E0"+ep.number+"-"+ep.name);
            select.append(option);
        }
        else
        {
            const option = document.createElement("option");
            option.value = ep.name;
            option.append("S0"+ep.season+"-E"+ep.number+"-"+ep.name);
            select.append(option);
        }
        
    });
};


const cardMaker = (data) => {
    data.forEach((ep) => 
    {
        const div = document.createElement("div");
        const div2 = document.createElement("div");
        const img = document.createElement("img");
        const p = document.createElement("p");
        const h4 = document.createElement("h4");
        const a = document.createElement("a");
        h4.append(ep.name);
        p.innerHTML = ep.summary;
        if(ep.number<10)
        div2.append("S0"+ep.season+"-E0"+ep.number);
        else
        div2.append("S0"+ep.season+"-E"+ep.number);
        img.src = ep.image.medium;
        img.alt = div2.innerText;
        img.style.borderRadius = "8px";
        a.href = ep.url;
        a.innerText = "More Details";
        div.append(img, h4, div2, p, a);
        div.setAttribute("class", "card");
        board.append(div);
    });
};
const epCardMaker = (ep) => 
{
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const h4 = document.createElement("h4");
    const a = document.createElement("a");
    h4.append(ep.name);
    p.innerHTML = ep.summary;
    if(ep.number<10)
    div2.append("S0"+ep.season+"-E0"+ep.number);
    else
    div2.append("S0"+ep.season+"-E"+ep.number);
    img.src = ep.image.medium;
    img.alt = div2.innerText;
    img.setAttribute("class", "epimg");
    a.href = ep.url;
    a.innerText = "More Details";
    div.append(img, h4, div2, p, a);
    div.setAttribute("class", "card");
    board.append(div);
};
serach.addEventListener("input",(elem) => 
{
    const searcher=elem.target.value.toLowerCase();
    board.innerHTML = "";
    let matchEp=0;
    backup.forEach((ep) => 
    {
        const trueName=ep.name.toLowerCase();
        const trueSummary=ep.summary.toLowerCase();
        if (trueName.includes(searcher)|| trueSummary.includes(searcher)) {matchEp++;epCardMaker(ep);}
    });
    span.innerHTML="Matched Episodes: "+matchEp;
});
select.addEventListener("change", (elem)=> 
{
    if (elem.target.value === "All Episods") 
    {span.innerHTML=`Matched Episodes: 73`;board.innerHTML = "";cardMaker(backup);}
    else 
    {board.innerHTML = "";const ep1=elem.target.selectedIndex - 1;span.innerHTML=`Matched Episodes: 1`;console.log(backup[ep1]);epCardMaker(backup[ep1]);}
});
