new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameRunning: false,
        actionLog: [],
    },
    methods: {
        startGame: function() {
            this.gameRunning=true;
            this.playerHealth=100;
            this.monsterHealth=100;
            this.actionLog = [];
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) +1, min);
        },
        checkLives: function() {
            if (this.playerHealth <= 0) {
                if(confirm('You lost, bummer. New game?')){
                    this.startGame()
                } else {
                    this.giveUp()
                }
            } else if (this.monsterHealth <= 0) {
                if(confirm('You Won! New game?')){
                    this.startGame()
                } else {
                    this.giveUp()
                }
            } else {
                return;
            }
        },
        playerAttack: function() {
            let playerDmg = this.calculateDamage(3,8)
            this.monsterHealth -= playerDmg;
            this.actionLog.unshift({
                isPlayer: true,
                text: `You used a normal attack and dealt ${playerDmg} points of damage`
            });
        },
        specialPlayerAttack: function() {
            let playerDmg = this.calculateDamage(2,10)
            this.monsterHealth -= playerDmg;
            this.actionLog.unshift({
                isPlayer: true,
                text: `You used a special attack and dealt ${playerDmg} points of damage`
            });
        },
        monsterAttack: function() {
            let monsterDmg = this.calculateDamage(4,7)
            this.playerHealth -= monsterDmg;
            this.actionLog.unshift({
                isPlayer: false,
                text: `The monster used a normal attack and dealt ${monsterDmg} point of damage`
            });
        },
        playerHeal: function() {
            if (this.playerHealth < 100){
                let lifeDeficit = 100 - this.playerHealth;
                let playerHeal = this.calculateDamage(4,9);
                if (playerHeal > lifeDeficit) {
                    this.playerHealth += lifeDeficit
                    this.actionLog.unshift({
                        isPlayer: true,
                        text: `You heal yourself for ${lifeDeficit} points of damage`
                    })
                    return true;
                } else {
                    this.playerHealth += playerHeal;
                    this.actionLog.unshift({
                        isPlayer: true,
                        text: `You heal yourself for ${playerHeal} points of damage`
                    })
                    return true;
                }
            } else {
                return false;
            } 
        },
        
        attack: function() {
            this.playerAttack();
            this.monsterAttack();
            this.checkLives();
        },
        specialAttack: function() {
            this.specialPlayerAttack();
            this.monsterAttack();
            this.checkLives();
        },
        heal: function() {
            if(this.playerHeal()){
                this.monsterAttack();
            }
            return;
        },
        giveUp: function() {
            this.gameRunning = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.actionLog = [];
        }
    }, 
    computed: {

    }
});