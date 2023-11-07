import clsx from 'clsx';

type CardProps = {
  children: any;
  className?: string;
};

type TitleProps = {
  title: string;
  className?: string;
};

type TextProps = {
  children: any | null;
  className?: string;
};

const Card = ({ children, className }: CardProps): JSX.Element => {
  return (
    <div className={clsx('h-fit w-full shadow-md rounded-md p-2', className)}>
      {children}
    </div>
  );
};

function Title({ title, className }: TitleProps): JSX.Element {
  return (
    <div className={clsx('text-center font-bold', className)}>{title}</div>
  );
}

function Text({ children, className }: TextProps): JSX.Element {
  return <p className={clsx('mt-5', className)}>{children}</p>;
}

Card.Title = Title;
Card.Text = Text;

export default Card;
