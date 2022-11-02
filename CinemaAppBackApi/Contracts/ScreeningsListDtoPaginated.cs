namespace Contracts;

public class DtoPaginated<T>
{
    public List<T> Data {get;set;}
    public int ActualCount{get;set;}
}

