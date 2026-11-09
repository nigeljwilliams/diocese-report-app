import { Component, input } from '@angular/core';
import { FontAwesomeModule, SizeProp } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { APP_ICONS } from './configs/icon-registry.config';
import { IconSize } from './enums/icon-size.enum';
import { IconColor } from './enums/icon-color.enum';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {

  /**
   * The name of the font awesome icon
   */
  name = input<string>('infoCicle');
  
  /**
   * The size of the icon
   */
  size = input<IconSize>(IconSize.SIZE_SMALL);

  /**
   * The color of the icon
   */
  color = input<IconColor>(IconColor.BLACK);

  /**
   * The icon object determined by the icon name which selects which font awesome
   * icon will be displayed
   */
  get iconObject(): IconDefinition {
    return APP_ICONS[this.name()];
  }

  /**
   * The size of the font awesome icon
   */
  get iconSize(): SizeProp {
    switch (this.size()) {
      case IconSize.SIZE_SMALL:
        return 'sm';
      case IconSize.SIZE_LARGE:
        return 'lg';
      case IconSize.SIZE_X_LARGE:
        return 'xl';
      case IconSize.SIZE_2X:
        return '2x';
      case IconSize.SIZE_3X:
        return '3x';
      case IconSize.SIZE_4X:
        return '4x';
      case IconSize.SIZE_5X:
        return '5x';
      case IconSize.SIZE_6X:
        return '6x';
      case IconSize.SIZE_7X:
        return '7x';
      case IconSize.SIZE_8X:
        return '8x';
      case IconSize.SIZE_9X:
        return '9x';
      case IconSize.SIZE_10X:
        return '10x';
      default: // IconSize.SIZE_X_SMALL:
        return 'xs';
    }
  }

  /**
   * The icon's class name, determined by the icon color
   */
  get iconClass(): string {
    switch (this.color()) {
      case IconColor.WHITE:
        return 'white-icon';
      case IconColor.RED:
        return 'red-icon';
      case IconColor.BLUE:
        return 'blue-icon';
      case IconColor.GREEN:
        return 'green-icon';
      case IconColor.YELLOW:
        return 'yellow-icon';
      case IconColor.ORANGE:
        return 'orange-icon';
      default: // IconColor.BLACK:
        return 'black-icon';
    }
  }
}
