export interface IEmployee {
    id?:          string | number;
    username?:    string;
    lastName?:    string;
    firstName?:   string;
    email?:       string;
    birthDate?:   string;
    status?:      boolean;
    group?:       string;
    description?: string;
    basicSalary?: string;
}

export interface IEmployeeResponse<T> {
    data?: T;
}
