//This is responsible for encoding strings to symbols accepted by automata, computer, and rules
//these strings are categorized by a minimal superset of codes that fully encode the string
//It doesnt even have to be the entire encoding superset, it just has to embrace enough of the superset
//to fully encode the input and output for optimal efficiency. In otherwords, we want to strip away
//extraneous symbols that encode nothing of the underlying string and its expected output.
class EncodingSets{
	constructor(input, output){

	}
	arithmetic(input, output){
		//reduce the string to a minimal encoding map that is a subset of arithmetic symbols that embrace both input and output symbols
	}
	arithmeticMap(input, output){
		//symbols:
		return {
			'(': "0000000000101000",
			')': "0000000000101001",
			'*': "0000000000101010",
			"+": "0000000000101011",
			"-": "0000000000101101",
			".": "0000000000101110",
			"/": "0000000000101111",
			"0": "0000000000110000",
			"1": "0000000000110001",
			"2": "0000000000110010",
			"3": "0000000000110011",
			"4": "0000000000110100",
			"5": "0000000000110101",
			"6": "0000000000110110",
			"7": "0000000000110111",
			"8": "0000000000111000",
			"9": "0000000000111001",
			"<": "0000000000111100",
			"=": "0000000000111101",
			">": "0000000000111110",
			"[": "0000000001011011",
			"]": "0000000001011101",
			"^": "0000000001011110",
			"{": "0000000001111011",
			"}": "0000000001111101",
			"√": "0010001000011010"
		}

	}
	verifyCodeMap(map){
		//convert key to binary and verify they match map encoding
		for(var i = 0; i<Object.keys(map).length; i++){
			var key = Object.keys(map)[i]
			var bin = map[Object.keys(map)[i]]
			if(this.toBinary([key])!=bin){
				throw Error('encoding error', key, bin, "should match toBinary("+key+") function result", this.toBinary([key]))
			}
			if(this.toUnicode([bin])!=key){
				throw Error('decoding error', bin, key, "should match toUnicode("+bin+") function result", this.toUnicode([bin]))
			}
		}
	}

	unicode2Bin(input) {
		
		return this.hex2Unicode(this.unicodeToHex(input));
	}
	hex2bin(hex){
		//https://stackoverflow.com/questions/45053624/convert-hex-to-binary-in-javascript
		return ("00000000" + (parseInt(hex, 16)).toString(2)).substr(-8);
	}

	bin2Hex(bin){
		return parseInt(bin, 2).toString(16)
	}
	unicodeToHex(input){
		return input.hexEncode().hexDecode()
	}
	hex2Unicode(hex){
		return hex.toString('utf-16')
	}
	bin2Unicode(bin){
		return this.hex2Unicode(this.bin2Hex(bin))
	}


	calculus(input, output){
		//reduce the string to a minimal encoding map that is a subset of calculus symbols that embrace both input and output symbols

		//important observation
		//if we have a known equation in mathematics, we can produce test cases in large quantities and find the 
		//equation in a single simulation step that meets all test cases, then we can compbine simulations
		//in a larger system that can one day find its own simulation called "mathematics"
	}
	physics(input, output){
		//reduce the string to a minimal encoding map that is a subset of physics symbols that embrace both input and output symbols

	}
	regex(input, output){
		//reduce the string to a minimal encoding map that is a subset of regex symbols that embrace both input and output symbols

	}
	english(input, output){
		//reduce the string to a minimal encoding map that is a subset of english symbols that embrace both input and output symbols

	}

}

//new EncodingSets().verifyCodeMap(new EncodingSets().arithmeticMap())
console.log(new EncodingSets().unicode2Bin('√'))

//  Binary	    Oct Dec	Hex			Glyph
// 						1963	1965	1967
// 0010 0000	040	32	20	 				space
// 0010 0001	041	33	21					!
// 0010 0010	042	34	22					"
// 0010 0011	043	35	23					#
// 0010 0100	044	36	24					$
// 0010 0101	045	37	25					%
// 0010 0110	046	38	26					&
// 0010 0111	047	39	27					'
// 0010 1000	050	40	28					(
// 0010 1001	051	41	29					)
// 0010 1010	052	42	2A					*
// 0010 1011	053	43	2B					+
// 0010 1100	054	44	2C					,
// 0010 1101	055	45	2D					-
// 0010 1110	056	46	2E					.
// 0010 1111	057	47	2F					/
// 0011 0000	060	48	30					0
// 0011 0001	061	49	31					1
// 0011 0010	062	50	32					2
// 0011 0011	063	51	33					3
// 0011	0100	064	52	34					4
// 0011 0101	065	53	35					5
// 0011 0110	066	54	36					6
// 0011 0111	067	55	37					7
// 0011 1000	070	56	38					8
// 0011 1001	071	57	39					9
// 0011 1010	072	58	3A					:
// 0011 1011	073	59	3B					;
// 0011 1100	074	60	3C					<
// 0011 1101	075	61	3D					=
// 0011 1110	076	62	3E					>
// 0011 1111	077	63	3F					?
// 0100 0000	100	64	40	 @	      `	    @
// 0100 0001	101	65	41					A
// 0100 0010	102	66	42					B
// 0100 0011	103	67	43					C
// 0100 0100	104	68	44					D
// 0100 0101	105	69	45					E
// 0100 0110	106	70	46					F
// 0100 0111	107	71	47					G
// 0100 1000	110	72	48					H
// 0100 1001	111	73	49					I
// 0100 1010	112	74	4A					J
// 0100 1011	113	75	4B					K
// 0100 1100	114	76	4C					L
// 0100 1101	115	77	4D					M
// 0100 1110	116	78	4E					N
// 0100 1111	117	79	4F					O
// 0101 0000	120	80	50					P
// 0101 0001	121	81	51					Q
// 0101 0010	122	82	52					R
// 0101 0011	123	83	53					S
// 0101 0100	124	84	54					T
// 0101 0101	125	85	55					U
// 0101 0110	126	86	56					V
// 0101 0111	127	87	57					W
// 0101 1000	130	88	58					X
// 0101 1001	131	89	59					Y
// 0101 1010	132	90	5A					Z
// 0101 1011	133	91	5B					[
// 0101 1100	134	92	5C	  \		 ~		\
// 0101 1101	135	93	5D					]
// 0101 1110	136	94	5E			 ↑	    ^
// 0101 1111	137	95	5F			 ←	    _
// 0110 0000	140	96	60		     @		`
// 0110 0001	141	97	61					a
// 0110 0010	142	98	62					b
// 0110 0011	143	99	63					c
// 0110 0100	144	100	64					d
// 0110 0101	145	101	65					e
// 0110 0110	146	102	66					f
// 0110 0111	147	103	67					g
// 0110 1000	150	104	68					h
// 0110 1001	151	105	69					i
// 0110 1010	152	106	6A					j
// 0110 1011	153	107	6B					k
// 0110 1100	154	108	6C					l
// 0110 1101	155	109	6D					m
// 0110 1110	156	110	6E					n
// 0110 1111	157	111	6F					o
// 0111 0000	160	112	70					p
// 0111 0001	161	113	71					q
// 0111 0010	162	114	72					r
// 0111 0011	163	115	73					s
// 0111 0100	164	116	74					t
// 0111 0101	165	117	75					u
// 0111 0110	166	118	76					v
// 0111 0111	167	119	77					w
// 0111 1000	170	120	78					x
// 0111 1001	171	121	79					y
// 0111 1010	172	122	7A					z
// 0111 1011	173	123	7B					{
// 0111 1100	174	124	7C	  ACK	¬		|
// 0111 1101	175	125	7D					}
// 0111 1110	176	126	7E	  ESC	|	    ~

