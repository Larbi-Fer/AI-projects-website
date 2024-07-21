interface ModelDetails {
    name: string,
    description: string,
    url: string,
    lastVersionUrl: string,
    inputShape: number[] | number[][] | number[][][],
    outputShape: number[],
    classes: string[],
    type: string,
    versions: ModelVersion[],
    run: ModelRunTypes[],
}

interface ModelVersion {
    accuracy: number,
    version: number,
}

interface ModelRunTypes {
    Image?: ModelRunImage
}

interface ModelRunImage {
    range_0_1?: boolean,
    blackAndWite?: boolean,
    dim: [number, number]
}