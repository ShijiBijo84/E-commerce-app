export type ItemProps = {
    _id: number;
    name: string;
    price: number;
    description: string;
    imgSrc: string;
}
export type UserProps = {
    name: string;
    email: string;
    password: string;
}

export type LoginProps = Omit<UserProps, 'name'>

export type CartItemProps = ItemProps & {
    quantity: number;
}

