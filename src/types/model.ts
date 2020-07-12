export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
// type InputEvent = React.ChangeEvent<HTMLInputElement>;
// update = (e: InputEvent): void => this.props.login[e.target.name] = e.target.value;

export type Student = {
  id: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
  subjects: string[] | null;
};

export type LoginCredentials = {
  email: string;
  password: string;
  status: number;
};
