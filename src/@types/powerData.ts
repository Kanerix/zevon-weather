export interface DataRowColumn {
	Index: number
	Name: string
	CombinedName: string
	Value: string
	DateTimeForData: string
}

export interface DataRow {
	Name: string
	Columns: DataRowColumn[]
}

export interface Data {
	data: {
		Rows: DataRow[]
	}
}
