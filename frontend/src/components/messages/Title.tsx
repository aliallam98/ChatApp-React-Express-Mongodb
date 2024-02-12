import { Separator } from "../ui/separator";

interface IProps {
  userName: string;
}

const Title = ({ userName }: IProps) => {
  return (
    <>
      <span className="block">To : {userName}</span>
      <Separator className="my-2"/>
    </>
  );
};

export default Title;
