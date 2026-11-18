/**
 * @typedef Book
 * @property {number} id (gerir automatically)
 * @property {string} title 
 * @property {string} [author]
 * @property {string} [description] (líka optional en function dealar með þetta)
 * @property {string} [cover]  mynd af bokina (optional)
 * @property {string} releaseDate 
 * @property {Review[]} reviews  
 */

/**
 * @typedef Review
 * @property {number} rating 1-5 stars (notum samt 1-10 þá er 1.5 star = 3)
 * @property {string} [description] uppl um review (optional) (sumir leave bara rating en segja ekkert (aka ragebait))
 * @property {string} [startedDate]  byrjun dagsetnign les bokina (optional)
 * @property {string} [finishedDate] end dagsetnign les bokina (optional)
 */

export default {};