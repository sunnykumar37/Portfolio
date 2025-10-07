import Link from "next/link"
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa6";
const socialList = [
  {icon: <FaGithub/>, path:"https://github.com/sunnykumar37"},
  {icon: <FaLinkedinIn/>, path:"https://www.linkedin.com/in/sunnykumar13/"},
  {icon: <FaInstagram/>, path:"https://www.instagram.com/sunny_199_/"},
  {icon: <FaTwitter/>, path:"https://x.com/Sunnykumar6866"},
]

const Socials = ({containerStyles, iconStyles}) => {
  return (
    <div className={containerStyles}>
      {
        socialList.map((item, index) => {
          return (
            <Link key={index} href={item.path} className={iconStyles}>{item.icon}</Link>
          )
        })
      }
    </div>
  );
};

export default Socials;
