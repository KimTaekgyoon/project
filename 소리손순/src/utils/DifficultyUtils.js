export const getDifficultyKor = (difficulty) => {
    switch (difficulty) {
        case 'LEVEL_1' : return "쉬움";
        case 'LEVEL_2' : return "보통";
        case 'LEVEL_3' : return "어려움";
        default : return "쉬움";
    }
}