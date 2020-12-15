// tree 是一个数组
const tree = [
	{
		// val 的值会显示在结点旁边
		val: "A", 
		
		// children 数组记录结点 A 的子结点
		// 也就是说
		// tree[1] 和 tree[2] 都是 tree[0] 的子结点
		children: [1, 2]
	},
	{
		val: "B",
		children: [3]
	},
	{
		val: "C",
		children: []
	},
	{
		val: "D",
		children: []
	}
]

// root 是一个数组
// root[0] 应为根结点的引用
// 程序只使用 root[0] 中的值
root = [tree[0]]
