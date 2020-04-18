using System;
using System.Collections.Generic;

/**

Boggle (Find all possible words in a board of characters) | Set 1
Given a dictionary, a method to do lookup in dictionary and a M x N board where every cell has one character. Find all possible words that can be formed by a sequence of adjacent characters. Note that we can move to any of 8 adjacent characters, but a word should not have multiple instances of same cell.

Example:

Input: dictionary[] = {"GEEKS", "FOR", "QUIZ", "GO"};
       boggle[][]   = {{'G', 'I', 'Z'},
                       {'U', 'E', 'K'},
                       {'Q', 'S', 'E'}};
      isWord(str): returns true if str is present in dictionary
                   else false.

Output:  Following words of dictionary are present
         GEEKS
         QUIZ
**/

namespace boggle
{
    class Program
    {
        // Let the given dictionary be following
        static readonly List<String> dictionary = new List<string>{
            "GEEKS",
            "FORA",
            "QUIZA",
            "GO",
            "ABACATE",
            "QEZ",
            "SEEK"
        };

        static char[,] boggle = {
            { 'G', 'I', 'Z' },
            { 'U', 'E', 'K' },
            { 'Q', 'S', 'E' }
        };

        static readonly int M = 3, N = 3;

        static List<int[]> GetAdjacentCells(int row, int col, bool[,] visited)
        {
            var result = new List<int[]>();

            for (int i = row - 1; i <= row + 1 && i < M; i++)
                for (int j = col - 1; j <= col + 1 && j < N; j++)
                    if (i > -1 && j > -1 && visited[i, j] == false)
                        result.Add(new int[] {i, j});

            return result;
        }

        static bool[,] Copy2dArray(bool[,] arr)
        {
            var newVisited = new bool[M, N];
            for (int row = 0; row < M; row++)
                for (int col = 0; col < N; col++)
                    newVisited[row, col] = arr[row, col];
            return newVisited;
        }

        static void RecurseAndMatch(List<int[]> cells, String currentString, bool[,] visited) {
            foreach (var cell in cells)
            {
                var cellRow = cell[0];
                var cellCol = cell[1];
                var newStr = currentString + boggle[cellRow, cellCol];
                if (dictionary.Contains(newStr))
                {
                    Console.WriteLine(newStr);
                }

                var newVisited = Copy2dArray(visited);
                newVisited[cellRow, cellCol] = true;
                var adjacentCells = GetAdjacentCells(cellRow, cellCol, newVisited);

                RecurseAndMatch(adjacentCells, newStr, newVisited);
            }
        }

        static void Main(string[] args)
        {
            for (int row = 0; row < M; row++)
            {
                for (int col = 0; col < N; col++)
                {
                    var visited = new bool[M, N];
                    visited[row, col] = true;
                    var curStr = boggle[row, col].ToString();

                    Console.WriteLine(boggle[row, col] + " - " + row + col);
                    var adjacentCells = GetAdjacentCells(row, col, visited);
                    RecurseAndMatch(adjacentCells, curStr, Copy2dArray(visited));
                }
            }


            Console.WriteLine("Following words of dictionary are present");
        }
    }
}
