import {
  faCheck,
  faCheckCircle,
  faCircleInfo,
  faCircleXmark,
  faExclamationCircle,
  faInfoCircle, faWarning,
  faXmark, faXmarkCircle,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

export const APP_ICONS: Record<string, IconDefinition> = {
  success: faCheckCircle,
  check: faCheck,
  warning: faWarning,
  close: faXmark,
  error: faExclamationCircle,
  info: faInfoCircle,
}