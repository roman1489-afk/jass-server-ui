

const HasCardValidator = {
    validate (validationParameter) {
        //console.log(validationParameter);
        let cardToPlay = function(cardToPlay, handCard) {
            //console.log(handCard);
            //console.log(cardToPlay);
            return handCard.equals(cardToPlay);
        };

        if (validationParameter.handCards.some(cardToPlay.bind(null, validationParameter.cardToPlay))) {
            return {
                permitted: true
            };
        } else {
            return {
                permitted: false,
                message: 'HasCardValidator: Card is not in your hand!'
            };
        }

    }
};

export default HasCardValidator;
