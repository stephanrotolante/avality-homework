export declare const states: string[];
export declare const formInfo: {
    firstname: {
        value: string;
        restictions: {
            restrict: string[];
            maxSize: number;
            minSize: number;
        };
    };
    lastname: {
        value: string;
        restictions: {
            restrict: string[];
            maxSize: number;
            minSize: number;
        };
    };
    email: {
        value: string;
        restictions: {
            restrict: never[];
            maxSize: number;
            minSize: number;
        };
    };
    npi: {
        value: string;
        restictions: {
            restrict: string[];
            minSize: number;
            maxSize: number;
        };
    };
    number: {
        value: string;
        restictions: {
            restrict: string[];
            minSize: number;
            maxSize: number;
        };
    };
    address: {
        value: string;
        restictions: {
            restrict: string[];
            strucutre: string;
            minSize: number;
            maxSize: number;
        };
    };
    city: {
        value: string;
        restictions: {
            restrict: string[];
            maxSize: number;
            minSize: number;
        };
    };
    zip: {
        value: string;
        restictions: {
            restrict: string[];
            maxSize: number;
            minSize: number;
        };
    };
    state: {
        value: string;
        restictions: {
            restrict: never[];
            maxSize: number;
            minSize: number;
        };
    };
};
