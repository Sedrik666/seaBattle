const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const again = document.getElementById('again');
const cells = document.querySelectorAll('td');


const game = {
    ships: [
        /*{
          location:['26', '36', '46', '56'],
          hit:['', '', '', '']
        },*/
        /*{
            location:['11', '12', '13'],
            hit:['', '', '',]
        },
        {
            location:['69', '79'],
            hit:['', '',]
        },*/
        {
            location:['00'],
            hit:['',]
        },
        {
            location:['01'],
            hit:['',]
        }
    ],
    shipCount: 2
};
const play = {
    record: localStorage.getItem('record') || 0,
    shot: 0,
    hit: 0,
    dead: 0,
    set updateData(data){
        this[data] += 1;
        this.render();
    },
    render(){
        record.textContent = this.record;
        shot.textContent = this.shot;
        hit.textContent = this.hit;
        dead.textContent = this.dead;
    },
};
const show = {
    hit(elem) {
        this.changeClass(elem, 'hit');
    },
    miss(elem) {
        this.changeClass(elem, 'miss');
    },
    dead(elem) {
        this.changeClass(elem, 'dead');
    },
    clear(elem) {
        this.changeClass(elem, '');
    },
    changeClass(elem, value){
        elem.className = value;
    }
};

const checkEmpty = (element) => element.className==='';

const fire = ({target}) => {
    if(!checkEmpty(target) || target.tagName !== 'TD') {
        return;
    }
    show.miss(target);
    play.updateData = 'shot';
    game.ships.forEach(ship => {
        const idx = ship.location.indexOf(target.id);
        if(idx>-1){
            show.hit(target);
            play.updateData = 'hit';
            ship.hit[idx] = 'x';

            if(ship.hit.every(deck => deck==='x')){
                play.updateData = 'dead';
                ship.location.forEach(id => show.dead(document.getElementById(id)));
                game.shipCount--;
                if(game.shipCount<1){
                    if(play.shot<play.record || play.record===0){
                        play.record = play.shot;
                        play.render();
                        localStorage.setItem('record', play.shot);
                    }
                    const header = document.querySelector('#header');
                    header.style='color: red';
                    header.innerHTML='Game Finish';
                }
            }
        }
    });
};

const againHandler = () => {
  play.shot = 0;
  play.hit = 0;
  play.dead = 0;
  cells.forEach(cell => show.clear(cell));
  play.render();
};

const init = () => {
    play.render();
    enemy.addEventListener('click', fire);
    again.addEventListener('click', againHandler)
};

init();