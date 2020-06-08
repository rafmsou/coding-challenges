#include <iostream>
#include <vector>
#include <unordered_set>
#include <unordered_map>
using namespace std;

//
// To compile this program:
// c++ shortestVacationDays.cpp -std=c++11 -o shortestVacationDays
//

int maxVacationDays(vector<int> v){

    unordered_set<int>myset;
    for(int x:v)myset.emplace(x);

    int size=myset.size();
    int ans=v.size();
    int hit=0;
    unordered_map<int,int>mymap;
    for(int start=0,end=0;end<v.size();end++){
        int x=v[end];

        if(mymap[x]==0)hit++;
        mymap[x]++;

        if(hit==size)ans=min(ans,end-start+1);
        while(start<end && end-start+1>=ans){
              x=v[start++];
              mymap[x]--;
              if(mymap[x]==0)hit--;
              if(hit==size)ans=min(ans,end-start+1);
        }
    }
    return ans;
}

int main(void){

    // cout<<maxVacationDays({7,3,7,3,1,3,4,1})<<endl;
    cout<<maxVacationDays({2,1,1,3,2,1,1,3})<<endl;
    // cout<<maxVacationDays({7,5,2,7,2,7,4,7})<<endl;
    return 0;
}
