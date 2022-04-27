export interface NordpoolDataRowColumn {
	Index: number
	Name: string
	CombinedName: string
	Value: string
	DateTimeForData: string
}

export interface NordpoolDataRow {
	Name: string
	Columns: NordpoolDataRowColumn[]
}

export interface NordpoolData {
	data: {
		Rows: NordpoolDataRow[]
	}
}
