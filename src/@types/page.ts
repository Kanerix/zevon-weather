import { PropsWithChildren } from 'react'
import { DefaultMantineColor } from '@mantine/core'
import { TablerIconProps } from '@tabler/icons'

export interface Page {
	path: string
	label: string
	color: DefaultMantineColor
	icon: PropsWithChildren<TablerIconProps>
}
