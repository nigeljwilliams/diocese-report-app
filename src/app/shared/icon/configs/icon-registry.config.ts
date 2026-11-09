import {
  faCheck,
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faWarning,
  faXmark,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

/**
 * A Record of available font awesome IconDefinition(s), accessible by
 * a human-readable name
 */
export const APP_ICONS: Record<string, IconDefinition> = {
  success: faCheckCircle,
  check: faCheck,
  warning: faWarning,
  close: faXmark,
  error: faExclamationCircle,
  info: faInfoCircle,
}