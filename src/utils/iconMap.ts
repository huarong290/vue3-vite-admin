// src/utils/iconMap.ts
import {
  User,
  Setting,
  Menu as MenuIcon,
  Tools,
  House,
  InfoFilled,
  Brush,
  Avatar,
  Lock,
  Edit,
  Delete,
  Plus,
  Search,
  Folder,
  Document,
  Star,
  Bell,
  ChatLineRound,
  Calendar,
  Camera,
  Picture,
  Upload,
  Download,
  Refresh,
  Warning,
  CircleCheck,
  CircleClose
} from '@element-plus/icons-vue'

// 通用 icon 映射表
export const iconMap: Record<string, unknown> = {
  user: User,
  setting: Setting,
  menu: MenuIcon,
  team: Tools,
  home: House,
  about: InfoFilled,
  brush: Brush,
  avatar: Avatar,
  lock: Lock,
  edit: Edit,
  delete: Delete,
  plus: Plus,
  search: Search,
  folder: Folder,
  document: Document,
  star: Star,
  bell: Bell,
  chat: ChatLineRound,
  calendar: Calendar,
  camera: Camera,
  picture: Picture,
  upload: Upload,
  download: Download,
  refresh: Refresh,
  warning: Warning,
  success: CircleCheck,
  error: CircleClose
}

// 默认 fallback 图标
export const defaultIcon = MenuIcon
