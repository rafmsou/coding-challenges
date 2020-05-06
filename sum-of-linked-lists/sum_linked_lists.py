"""
This problem was asked by Microsoft.

Let's represent an integer in a linked list format by having each node represent a digit in the number. The nodes make up the number in reversed order.

For example, the following linked list:

1 -> 2 -> 3 -> 4 -> 5
is the number 54321.

Given two linked lists in this format, return their sum in the same linked list format.

For example, given

9 -> 9
5 -> 2
return 124 (99 + 25) as:

4 -> 2 -> 1
"""


class Node:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __str__(self):
        cur_node = self
        nodes = [str(self.val)]
        while cur_node.next != None:
            nodes.append(str(cur_node.next.val))
            cur_node = cur_node.next
        return '->'.join(nodes)


def list_len(linked_list):
    if linked_list == None:
        return 0

    result = 1
    head = linked_list
    while head.next != None:
        result += 1
        head = head.next

    return result

def sum_linked_lists(head1, head2):
    if list_len(head1) < list_len(head2):
        temp = head1
        head1 = head2
        head2 = temp

    cur_sum = 0
    headsum = Node(0)
    tempsum = headsum

    # head1 is always bigger or equal to head2 length
    while head1 != None:
        carry = 0 if (cur_sum) < 10 else 1
        cur_sum = head1.val + head2.val + carry
        tempsum.next = Node(cur_sum % 10)
        head1 = head1.next
        head2 = head2.next if head2.next != None else Node(0)
        tempsum = tempsum.next

    if carry > 0:
        tempsum.next = Node(carry)

    return headsum

# Lists of same size
# head1 = Node(5, Node(6, Node(3)))
# head2 = Node(8, Node(4, Node(6)))

# Lists of different sizes
head1 = Node(8, Node(4, Node(6)))
head2 = Node(5, Node(6, Node(3, Node(0, Node(1)))))
print(sum_linked_lists(head1, head2).next)
