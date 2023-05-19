import {
  AiOutlineHeart,
  AiOutlineHistory,
  AiOutlineCalendar,
  AiOutlineCheckCircle,
  AiOutlineReload,
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineQuestionCircle,
  AiOutlineSearch,
  AiFillHeart,
  AiFillGithub
} from 'react-icons/ai';
import { BsTrash, BsPlayFill, BsListNested, BsFacebook } from 'react-icons/bs';
import { FaListUl, FaSignOutAlt } from 'react-icons/fa';
import { HiOutlineExclamationCircle, HiOutlineUpload  } from 'react-icons/hi';
import { TfiLayoutMediaCenterAlt, TfiGallery } from 'react-icons/tfi';
import { IoMdSettings, IoMdOpen, IoMdClose, IoMdSunny } from 'react-icons/io';
import {
  MdDarkMode,
  MdOutlineComputer,
  MdSystemUpdateAlt,
  MdOutlineNavigateNext,
  MdOutlineNavigateBefore,
} from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';


<MdDarkMode />;
export const iconHelper: Record<string, Function> = {
  dark: (className: string) => <MdDarkMode className={className} />,
  light: (className: string) => <IoMdSunny className={className} />,
  system: (className: string) => <MdOutlineComputer className={className} />,
  menu: (className: string) => <GiHamburgerMenu className={className} />,
  exclamation: (className: string) => <HiOutlineExclamationCircle className={className} />,
  update: (className: string) => <MdSystemUpdateAlt className={className} />,
  reload: (className: string) => <AiOutlineReload className={className} />,
  signOut: (className: string) => <FaSignOutAlt className={className} />,
  next: (className: string) => <MdOutlineNavigateNext className={className} />,
  before: (className: string) => <MdOutlineNavigateBefore className={className} />,
  upload: (className: string) => <HiOutlineUpload className={className} />,
  setting: (className: string) => <IoMdSettings className={className} />,
  up: (className: string) => <AiOutlineUp className={className} />,
  down: (className: string) => <AiOutlineDown className={className} />,
  open: (className: string) => <IoMdOpen className={className} />,
  close: (className: string) => <IoMdClose className={className} />,
  play: (className: string) => <BsPlayFill className={className} />,
  question: (className: string) => <AiOutlineQuestionCircle className={className} />,
  search: (className: string) => <AiOutlineSearch className={className} />,
  heart: (className: string) => <AiOutlineHeart className={className} />,
  fillHeart: (className: string) => <AiFillHeart className={className} />,
  systemUpdate: (className: string) => <MdSystemUpdateAlt className={className} />,
  trailer: (className: string) => <TfiLayoutMediaCenterAlt className={className} />,
  list: (className: string) => <FaListUl className={className} />,
  listNested: (className: string) => <BsListNested className={className} />,
  gallery: (className: string) => <TfiGallery className={className} />,
  history: (className: string) => <AiOutlineHistory className={className} />,
  calendar: (className: string) => <AiOutlineCalendar className={className} />,
  checkCircle: (className: string) => <AiOutlineCheckCircle className={className} />,
  trash: (className: string) => <BsTrash className={className} />,
  github: (className: string) => <AiFillGithub className={className} />,
  facebook: (className: string) => <BsFacebook className={className} />,
};
