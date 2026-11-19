/**
 * Hérna er allur kóðinn fyrir virkni stjarnanna.
 * 
 * 
 */

/**
 * Þetta er mikilvægt fyrir notanda að skrifa ummál á bók.
 * 
 * @param starContainer {div} Div object that contains all the star images
 * @param ratingHolder {input} Input element sem mun innihalda ratingið á stjörnunum
 */
export function createStars(starContainer, ratingHolder) {

    for (let i = 0; i < starContainer.children.length; i++) {
        starContainer.children[i].addEventListener("click",(e) => {
            console.log(e.target.id);
            SetStars(starContainer, e.target.id);
            ratingHolder.value = e.target.id;
        })
        
        
    }
}
    
/**
 * Þetta function er mikilvægt til þess að gera stjörnubreytingarnar sýnilegar.
 * Þú vilt líka nota þetta til að sýna meðalstjörnufjölda á bók.
 * 
 * @param starContainer {div} Div object that contains all the star images
 * @param ratingNumber {int} Integer from numbers 0-10 to determine the rating
 */
export function SetStars(starContainer, ratingNumber) {
    for (let i = 0; i < starContainer.children.length; i++) {
        if (i < +ratingNumber){
            console.log(+starContainer.children[i].id,"is a lesser number than ", +ratingNumber, "!");
            starContainer.children[i].src = ("../images/star-"+(i%2==0 ? "open" : "close")+"-full.svg");
        }
        else {
            console.log(+starContainer.children[i].id,"is not a lesser number than ", +ratingNumber, "!");
            starContainer.children[i].src = ("../images/star-"+(i%2==0 ? "open" : "close")+"-empty.svg");
        }
    }
    
}