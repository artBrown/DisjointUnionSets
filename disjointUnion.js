//https://www.geeksforgeeks.org/disjoint-set-data-structures/
var DisjointUnionSets = /** @class */ (function () {
    function DisjointUnionSets(n) {
        this.rank = [];
        this.parent = [];
        this.n = n;
        this.makeSet();
    }
    DisjointUnionSets.prototype.makeSet = function () {
        for (var i = 0; i < this.n; i++) { // Initially, all elements are in their own set.
            this.parent[i] = i;
        }
    };
    DisjointUnionSets.prototype.find = function (x) {
        if (this.parent[x] != x) { // Finds the representative of the set that x is an element of
            this.parent[x] = this.find(this.parent[x]); // if x is not the parent of itself Then x is not the representative of his set, so we recursively call Find on its parent and move i's node directly under the representative of this set
        }
        return this.parent[x];
    };
    DisjointUnionSets.prototype.union = function (x, y) {
        var xRoot = this.find(x), yRoot = this.find(y); // Find representatives of two sets
        if (xRoot == yRoot) // Elements are in the same set, no need to unite anything.
            return;
        if (this.rank[xRoot] < this.rank[yRoot]) // If x's rank is less than y's rank
            this.parent[xRoot] = yRoot; // Then move x under y so that depth of tree remains less
        else if (this.rank[yRoot] < this.rank[xRoot]) // Else if y's rank is less than x's rank
            this.parent[yRoot] = xRoot; // Then move y under x so that depth of tree remains less
        else { // if ranks are the same
            this.parent[yRoot] = xRoot; // Then move y under x (doesn't matter which one goes where)
            this.rank[xRoot] = this.rank[xRoot] + 1; // And increment the result tree's rank by 1
        }
    };
    return DisjointUnionSets;
}());
(function (args) {
    var n = 5, // Let there be 5 persons with ids as 0, 1, 2, 3 and 4
    dus = new DisjointUnionSets(n);
    dus.union(0, 2); // 0 is a friend of 2
    dus.union(4, 2); // 4 is a friend of 2
    dus.union(3, 1); // 3 is a friend of 1
    if (dus.find(4) == dus.find(0)) // Check if 4 is a friend of 0
        console.log("Yes");
    else
        console.log("No");
    if (dus.find(1) == dus.find(0)) // Check if 1 is a friend of 0
        console.log("Yes");
    else
        console.log("No");
})(['args']);
