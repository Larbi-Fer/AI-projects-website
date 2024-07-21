export const models : { [key: string]: ModelDetails } = {
    happysad: {
        name: 'Happy or Sad',
        description: 'A model that predicts if a person is happy or sad based on their facial expression.',
        // url: '/models/happysad/v{version}/model.json',
        url: `https://larbi-fer.github.io/My-Models/happysad/v{version}/model.json`,
        // lastVersionUrl: 'https://larbi-fer.github.io/My-Models/happysad/v1/model.json',
        inputShape: [256, 256, 3],
        outputShape: [1],
        // 0: Happy, 1: Sad
        classes: ['Happy', 'Sad'],
        type: 'Convolutional Neural Network',
        versions: [{
            accuracy: 0.92,
            version: 1
        }],
        run: [{
            Image: {
                range_0_1: true,
                blackAndWite: false,
                dim: [256, 256],
            }
        }]
    },
}

export const resources = [
    'kaggle',
]