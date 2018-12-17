import Helper from '../classes/Helper'
import Score from '../objects/Score'

export interface Hero {
  name: string
  frame: string
  price: number,
  purchased?: boolean
}

export const Heroes: Hero[] = [
  { name: 'deer', frame: 'deer', price: 0 },
  { name: 'bird', frame: 'bird', price: 100 },
  { name: 'cat', frame: 'cat', price: 500 },
  { name: 'cola', frame: 'cola', price: 1000 },
  { name: 'cola_1', frame: 'cola_1', price: 1500 },
  { name: 'crab', frame: 'crab', price: 5000 },
  { name: 'dinosaur', frame: 'dinosaur', price: 6000 },
  { name: 'dog', frame: 'dog', price: 6500 },
  { name: 'donut', frame: 'donut', price: 7000 },
  { name: 'donut_1', frame: 'donut_1', price: 7300 },
  { name: 'bird_1', frame: 'bird_1', price: 8000 },
  { name: 'monkey', frame: 'monkey', price: 8000 },
  { name: 'pig', frame: 'pig', price: 9300 },
  { name: 'pijama', frame: 'pijama', price: 10000 },
  { name: 'pijama_2', frame: 'pijama_2', price: 10000 },
  { name: 'rabbit', frame: 'rabbit', price: 15000 },
  { name: 'shrimp', frame: 'shrimp', price: 19000 },
  { name: 'turtle', frame: 'turtle', price: 30000 },
  { name: 'teddy-bear', frame: 'teddy-bear', price: 50000 }
];

export class UserHeroes {
  public static LOCAL_KEY_BUY = 'LOCAL_KEY_BUY'
  public static LOCAL_KEY_CURRENT = 'LOCAL_KEY_CURRENT'
  public static DEFAULT_HERO = 'deer'

  public static getAllHeroes() {
    let allHeroes: Hero[] = [].concat(Heroes),
    localHeroesArray = UserHeroes.getHeroesArray();

    for(let hero of allHeroes) {
      hero.purchased = false
      if(localHeroesArray.indexOf(hero.name) >= 0) hero.purchased = true;
    }

    return allHeroes
  }

  public static get() : Hero[] {
    let heroes: Hero[] = [],
    localHeroesArray = UserHeroes.getHeroesArray();

    if(localHeroesArray) {
      for(let name of  localHeroesArray) {
        let heroInHeroes = Heroes.find((item) => item.name == name);
        if(heroInHeroes) heroes.push(heroInHeroes)
      }
    }

    return heroes
  }

  private static getHeroesArray(): string[] {
    let localHeroes = Helper.getLocal(UserHeroes.LOCAL_KEY_BUY),
    localHeroesArray = [];
    if(localHeroes) localHeroesArray = JSON.parse(localHeroes as string)
    if(!localHeroesArray) localHeroesArray = []
    return localHeroesArray
  }

  public static addHero(hero: Hero) {
    let localHeroesArray = UserHeroes.getHeroesArray()
    localHeroesArray.push(hero.name)
    Helper.setLocal(UserHeroes.LOCAL_KEY_BUY, JSON.stringify(localHeroesArray));
  }

  public static getCurrent() : Hero {
    let hero = Helper.getLocal(UserHeroes.LOCAL_KEY_CURRENT)
    if(hero) {
      let localHero = Heroes.find((item) => item.name == hero)
      if(localHero) return localHero
    }

    // Default
    let defaultHero = Heroes.find((item) => item.name == UserHeroes.DEFAULT_HERO)
    Helper.setLocal(UserHeroes.LOCAL_KEY_CURRENT, defaultHero.name)
    UserHeroes.buy(defaultHero.name)
    return defaultHero
  }

  public static setCurrent(hero: Hero) : void {
    Helper.setLocal(UserHeroes.LOCAL_KEY_CURRENT, hero.name)
  }

  public static buy(name: string) {
    let localHero = Heroes.find((item) => item.name == name),
    score = new Score()

    if(score.getScore() < localHero.price) {
      alert('Low money!!!')
      return
    }

    score.removeScore(localHero.price)
    UserHeroes.setCurrent(localHero)
    UserHeroes.addHero(localHero)

  }
}
